# CMS Editor Guide

This guide is for content creators and editors managing events in the Payload CMS.

## Accessing the Admin Panel

1. Navigate to `http://localhost:3000/admin`
2. Log in with your admin credentials
3. Click on **Events** in the left sidebar

## Creating a New Event

1. Click the **Create New** button in the top right
2. Fill in the required fields:
   - **Title** — Event name
   - **Description** — What the event is about, what attendees will do or learn
   - **Schedule**
     - **Date** — The calendar date of the event
     - **Start Time** / **End Time** — When the event begins and ends
   - **Location** — Where it's happening (e.g., "Digital Makerspace")
   - **Image**
     - **Src** — Direct link to the image
     - **Alt** — Description for accessibility
   - **Categories** — Select up to 3 categories that describe the event (pulled from the **Event Categories** collection)
   - **URL** — Optional link to more details or registration
3. Click **Save**

**Note:** Events don't currently have a draft/preview stage — once saved, an event is immediately visible to anyone who can view the site. Double-check details before saving, especially schedule and location.

## Event Status

The **Status** field has four options: **Upcoming**, **Ongoing**, **Past**, **Cancelled**.

- **Upcoming/Ongoing/Past are normally recalculated automatically** based on the event's schedule — you generally don't need to set these yourself.
- **Cancelled is the one status you set manually.** If an event is called off, open it and change **Status** to **Cancelled**, then save.

**Note:** Cancelling doesn't remove the event — it stays visible, marked as cancelled, so anyone who already saw it knows it's off.

## Editing an Existing Event

1. Find the event in the **Events** collection
2. Make your changes
3. Click **Save** — changes are live immediately

**Rescheduling:** Changing the date or time of an existing event updates it everywhere automatically — no need to create a new entry.

## Categories

Categories let visitors filter the calendar down to what interests them. You can select up to 3 per event.

**To add categories to an event:**

1. In the Categories field, click **Add**
2. Search and select from existing categories
3. Save the event

**Creating new categories:**

- Contact an admin to add new categories in the **Event Categories** collection

## Common Issues

### "Required field missing"

- Check: Title, Description, Date, Start Time, End Time, Location, at least one Category, Image (Src and Alt)
- All of these must be filled in

### "Too many categories"

- Events can have a maximum of 3 categories — remove one before adding another

### Event not showing on the calendar

- Confirm the date/time is what you expect
- Confirm it isn't accidentally marked **Cancelled**
- Clear browser cache and refresh

### Recurring event only shows once

- Confirm **Is Recurring** is toggled on
- Check that **Frequency** and **Interval** are both set
- If **Ends On** is set to a past date, no future occurrences will show

## Best Practices

✅ **Do:**

- Write clear, specific titles
- Double-check start/end times before saving — there's no draft stage to catch mistakes before they're visible
- Add at least one relevant category
- Fill in image alt text for accessibility
- Use Cancelled status rather than deleting a cancelled event

❌ **Don't:**

- Leave Location blank, even for virtual events (use "Online" or similar)
- Add more than 3 categories
- Forget to update the date if an event gets rescheduled

## Getting Help

If you need help:

1. Check this guide first
2. Ask another editor
3. Contact the dev team

Happy scheduling! 📅
