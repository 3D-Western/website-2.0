import {
  ValidationError,
  type CollectionBeforeValidateHook,
  type CollectionConfig,
} from "payload";
import { assignableCollections } from "../access/collectionAccess";

const adminOnlyUpdate = {
  update: ({ req }: { req: any }) => req.user?.role === "admin",
};

const validatePassword: CollectionBeforeValidateHook = ({ data }) => {
  const password = data?.password;

  // only enforce on create/when a new password is actually being set
  if (password && password.length < 8) {
    throw new ValidationError({
      errors: [
        {
          path: "password",
          message: "Password must be at least 8 characters long.",
        },
      ],
    });
  }
};

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    // lock out repeated failed logins
    maxLoginAttempts: 10,
    lockTime: 10 * 60 * 1000, // 10 min lockout
    // tighter token expiry than the 2hr default, tune to your needs
    tokenExpiration: 60 * 60, // 1 hour
  },
  hooks: {
    beforeValidate: [validatePassword],
  },
  admin: {
    group: "General Collections",
    useAsTitle: "email",
  },
  fields: [
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      // prevents an editor from ever setting their OWN role via the API,
      // even if they find a way to PATCH their own user doc
      access: adminOnlyUpdate,
    },
    {
      name: "allowedCollections",
      type: "select",
      hasMany: true,
      admin: {
        condition: (data) => data.role === "editor", // only show for editors
      },
      options: assignableCollections.map((collection) => ({
        label: collection.label,
        value: collection.slug,
      })),

      access: adminOnlyUpdate,
    },
  ],
  access: {
    // only admins can create new users (you already have this)
    create: ({ req }) => req.user?.role === "admin",

    // users can read their own doc; admins can read everyone's
    read: ({ req }) => {
      if (req.user?.role === "admin") return true;
      return { id: { equals: req.user?.id } };
    },

    // users can update their own doc (e.g. change their name);
    // admins can update anyone's
    update: ({ req }) => {
      if (req.user?.role === "admin") return true;
      return { id: { equals: req.user?.id } };
    },

    // only admins can delete users
    delete: ({ req }) => req.user?.role === "admin",

    // only admins can even see the users list in /admin
    // admin: ({ req }) => req.user?.role === "admin",
  },
};
