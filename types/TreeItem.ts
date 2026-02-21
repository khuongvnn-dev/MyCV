export interface TreeItem {
  id: string | number;
  title: string;
  startDate: string; // Chấp nhận: "2024", "05/2024", "2024-05-15"
  endDate?: string; // Nếu để trống sẽ hiện "Hiện tại"
  description?: string;
  subDescription?: string; // Text nhỏ và mờ hơn
  children?: TreeItem[];
  badget?: string[];
  link?: { [key: string]: string };
  markdown?: string;
}
