
export const vi = {
  // Common
  close: 'Đóng',
  save: 'Lưu',
  cancel: 'Hủy',
  edit: 'Sửa',
  delete: 'Xóa',
  confirm: 'Xác nhận',
  
  // Dashboard
  dashboard_title: 'Work Whisperer',
  weekly_status_title: 'Trạng Thái Tuần',
  work_notes_title: 'Ghi Chú Công Việc',
  add_note: 'Thêm Ghi Chú',
  
  // Weekly Status
  weekdays: {
    monday: 'T2',
    tuesday: 'T3',
    wednesday: 'T4',
    thursday: 'T5',
    friday: 'T6',
    saturday: 'T7',
    sunday: 'CN',
  },
  
  attendance_status: {
    missing: 'Thiếu chấm công',
    complete: 'Đủ công',
    not_updated: 'Chưa cập nhật',
    leave: 'Nghỉ phép',
    sick: 'Nghỉ bệnh',
    holiday: 'Nghỉ lễ',
    absent: 'Vắng không lý do',
    late: 'Vào muộn/ra sớm',
    future: 'Chưa đến',
  },
  
  // Check-in/out
  checkin: 'Giờ vào',
  checkout: 'Giờ ra',
  reason: 'Lý do',
  
  // Work Notes
  note: {
    title: 'Tiêu đề',
    content: 'Nội dung',
    reminder_time: 'Thời gian nhắc nhở',
    weekdays: 'Ngày trong tuần',
    title_placeholder: 'Nhập tiêu đề (tối đa 100 ký tự)',
    content_placeholder: 'Nhập nội dung (tối đa 300 ký tự)',
    add_title: 'Thêm Ghi Chú Mới',
    edit_title: 'Sửa Ghi Chú',
    delete_confirm: 'Bạn có chắc chắn muốn xóa ghi chú này?',
  },
  
  // Validation Messages
  validation: {
    required: '{field} không được để trống',
    maxLength: '{field} không được vượt quá {max} ký tự',
    minLength: '{field} phải có ít nhất {min} ký tự',
    invalidDate: 'Ngày không hợp lệ',
    invalidTime: 'Thời gian không hợp lệ',
    future_date: 'Thời gian nhắc nhở phải là thời gian trong tương lai',
  },
} as const;
