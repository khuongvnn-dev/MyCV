import { GGSheetData } from "@/types/GGSheetType";

/**
 * Hàm parse CSV thô thành mảng GGSheetData
 */
export const parseCSV = (csvText: string): GGSheetData[] => {
  const lines = csvText.split(/\r\n|\n/);
  const result: GGSheetData[] = [];

  // Bắt đầu từ dòng 2 để bỏ qua header
  for (let i = 2; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    const rowData = line
      .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
      .map((val) => val.replace(/^"|"$/g, "").trim());

    if (rowData.length >= 4) {
      result.push({
        id: rowData[0], // Cột A
        field: rowData[1], // Cột B
        en: rowData[2], // Cột C (English)
        vi: rowData[3], // Cột D (Vietnamese)
      });
    }
  }

  console.debug("Dữ liệu sau khi parse từ CSV:", result);

  return result;
};

/**
 * Hàm lấy dữ liệu theo mã quốc gia và id/field
 */
export const getDataByKey = (
  data: GGSheetData[],
  lang: "en" | "vi",
  searchKey: string,
): string => {
  if (!data || !Array.isArray(data)) return searchKey;

  const item = data.find((d) => d.id === searchKey || d.field === searchKey);

  if (item) {
    return item[lang];
  }

  return searchKey;
};

/**
 * Cleans a JSON string by replacing double quotes ("") with a single quote (")
 * @param str The input JSON string to be cleaned
 * @returns A cleaned JSON string with redundant double quotes removed
 */
export const cleanJsonStr = (str: string): string => {
  return str.replace(/""/g, '"');
};
