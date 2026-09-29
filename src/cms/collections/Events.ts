import { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
  slug: "events",
  access: {
    read: () => true,
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
    {
      name: "schedule",
      type: "group",
      fields: [
        {
          name: "date",
          type: "date",
          required: true,
        },
        {
          name: "startTime",
          type: "date",
          required: true,
        },
        {
          name: "endTime",
          type: "date",
          required: true,
        },
      ],
    },

    { name: "location", type: "text", required: true },
    {
      name: "image",
      type: "group",
      fields: [
        { name: "src", type: "text", required: true },
        { name: "alt", type: "text", required: true },
      ],
    },
    { name: "url", type: "text" },

    // --- Category/type (for filtering) ---
    // Changed from free-text to select so filtering has a fixed, known set of values.
    {
      name: "categories",
      type: "select",
      required: true,
      hasMany: true,
      options: [
        { label: "Workshop", value: "workshop" },
        { label: "Social", value: "social" },
        { label: "Meeting", value: "meeting" },
        { label: "Holiday", value: "holiday" },
        { label: "Other", value: "other" },
      ],
    },

    // --- Recurring event support ---
    {
      name: "recurrence",
      type: "group",
      fields: [
        { name: "isRecurring", type: "checkbox", defaultValue: false },
        {
          name: "frequency",
          type: "select",
          options: ["daily", "weekly", "monthly", "yearly"],
          admin: { condition: (_, siblingData) => siblingData?.isRecurring },
        },
        {
          name: "interval",
          type: "number",
          admin: {
            description: "Repeat every N days/weeks/months/years",
            condition: (_, siblingData) => siblingData?.isRecurring,
          },
        },
        {
          name: "endsOn",
          type: "date",
          admin: { condition: (_, siblingData) => siblingData?.isRecurring },
        },
      ],
    },

    // --- RSVP / capacity (future expansion point, data model only) ---
    {
      name: "rsvp",
      type: "group",
      fields: [
        { name: "enabled", type: "checkbox", defaultValue: false },
        { name: "capacity", type: "number" },
        { name: "rsvpCount", type: "number", defaultValue: 0 },
      ],
    },

    // --- Status ---
    // Stored + manually overridable (for "cancelled"), but upcoming/ongoing/past
    // should be computed at read-time in the fetch utility rather than trusted
    // as always-accurate here, since a stored value would go stale.
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "upcoming",
      options: ["upcoming", "ongoing", "past", "cancelled"],
      admin: {
        description:
          "Set to 'cancelled' manually when needed. Upcoming/ongoing/past are otherwise recalculated from schedule dates at fetch time.",
      },
    },
  ],
};
