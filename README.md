# Invoices Collab

Welcome to **Invoices Collab**, a modern, high-performance web application designed for seamless invoice collaboration, client management, and product tracking. Built with the cutting-edge Next.js App Router, Clerk for B2B authentication, and Neon Serverless Postgres.

## Table of Contents

- [Features](#-features)
- [Getting Started](#%EF%B8%8F-getting-started)
- [Code Examples](#-code-examples)
  - [Fetching Data with Tenant Isolation](#fetching-data-with-tenant-isolation)
  - [Server Actions with Cache Invalidation](#server-actions-with-cache-invalidation)
  - [Optimistic UI Updates](#optimistic-ui-updates)
- [License & Terms](#-license--terms)


## 🚀 Features

- **Multi-Tenant Authentication**: Built-in support for personal accounts and organizational workspaces using Clerk.
- **Client & Product Management**: Full CRUD pipelines with optimistic UI updates and Server Actions.
- **High-Performance Caching**: Utilizes advanced Next.js caching (`use cache`, `cacheTag`, `updateTag`) for instant read-your-own-writes experiences.
- **Modern UI**: Designed using Tailwind CSS and accessible components (via Base UI / shadcn).

## 🛠️ Getting Started

First, install the dependencies using Bun (recommended):

```bash
bun install
```

Set up your environment variables by copying `.env.example` to `.env.local` and filling in your database and Clerk keys:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
DATABASE_URL=postgres://...
```

Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 💻 Code Examples

### Fetching Data with Tenant Isolation

We strictly enforce tenant isolation by dynamically extracting the `tenantId` (either an organization ID or a personal user ID) in our Data Access Layer:

```typescript
import { auth } from "@clerk/nextjs/server";
import { dbGetProducts } from "../db/queries";

export async function getProducts(page: number = 1) {
  const { userId, orgId } = await auth.protect();
  const tenantId = orgId ?? userId;
  
  return dbGetProducts(page, tenantId);
}
```

### Server Actions with Cache Invalidation

When creating or modifying resources, we use targeted cache tag invalidation to ensure the user immediately sees their updates without wiping the cache globally.

```typescript
"use server";
import { updateTag } from "next/cache";
import { addProduct } from "../dal/products";

export async function addProductAction(product: Product) {
  const dalResult = await addProduct(product);

  return dalResult.match(
    (data) => {
      // Instantly invalidate the specific tenant's product cache
      updateTag(`products-${data.orgId}`);
      return { data, reason: null };
    },
    (reason) => ({ data: null, reason })
  );
}
```

### Optimistic UI Updates

Our frontend forms leverage React 19 hooks and optimistic updates for a snappy user experience:

```tsx
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { addProductAction } from "@/actions/products";

// Inside component...
const mutation = useMutation({
  mutationFn: async (values: ProductFormValues) => {
    const res = await addProductAction(values);
    if (res.reason) throw new Error(res.reason);
    return res.data;
  },
  onSuccess: () => {
    toast.success("Product created successfully!");
  }
});
```

## 📄 License & Terms

Please see the [LICENSE](LICENSE) file for usage terms. This software is provided free for educational purposes, with strict prohibitions against commercial use.
