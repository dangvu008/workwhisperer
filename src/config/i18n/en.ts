
export const en = {
  // Common
  close: 'Close',
  save: 'Save',
  cancel: 'Cancel',
  edit: 'Edit',
  delete: 'Delete',
  confirm: 'Confirm',
  
  // Dashboard
  dashboard_title: 'Work Whisperer',
  weekly_status_title: 'Weekly Status',
  work_notes_title: 'Work Notes',
  add_note: 'Add Note',
  
  // Weekly Status
  weekdays: {
    monday: 'Mon',
    tuesday: 'Tue',
    wednesday: 'Wed',
    thursday: 'Thu',
    friday: 'Fri',
    saturday: 'Sat',
    sunday: 'Sun',
  },
  
  attendance_status: {
    missing: 'Missing Time Records',
    complete: 'Complete',
    not_updated: 'Not Updated',
    leave: 'On Leave',
    sick: 'Sick Leave',
    holiday: 'Holiday',
    absent: 'Absent',
    late: 'Late/Early Leave',
    future: 'Not Yet',
  },
  
  // Check-in/out
  checkin: 'Check-in',
  checkout: 'Check-out',
  reason: 'Reason',
  
  // Work Notes
  note: {
    title: 'Title',
    content: 'Content',
    reminder_time: 'Reminder Time',
    weekdays: 'Weekdays',
    title_placeholder: 'Enter title (max 100 characters)',
    content_placeholder: 'Enter content (max 300 characters)',
    add_title: 'Add New Note',
    edit_title: 'Edit Note',
    delete_confirm: 'Are you sure you want to delete this note?',
  },
  
  // Validation Messages
  validation: {
    required: '{field} is required',
    maxLength: '{field} cannot exceed {max} characters',
    minLength: '{field} must be at least {min} characters',
    invalidDate: 'Invalid date',
    invalidTime: 'Invalid time',
    future_date: 'Reminder time must be in the future',
  },
} as const;
