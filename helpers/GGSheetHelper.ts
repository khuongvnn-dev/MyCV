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

export const buildSystemInstruction = (
  data: GGSheetData[],
  language: "en" | "vi",
): string => {
  const name_en = getDataByKey(data, "en", "name"),
    name_vi = getDataByKey(data, "vi", "name"),
    careerPath = getDataByKey(data, language, "career-path"),
    projects = getDataByKey(data, language, "projects");

  return `Bạn là trợ lý AI đại diện cho ${name_vi} - ${name_en}. 
    Dữ liệu của bạn dựa trên hồ sơ của:
    - Con đường sự nghiệp: ${careerPath}
    - Các dự án đã thực hiện: ${projects}
    
    Quy tắc quan trọng:
    1. Trả lời dưới dạng văn bản hội thoại (không dùng định dạng JSON).
    2. Hãy trả lời người dùng bằng ngôn ngữ người dùng hỏi. Nếu hỏi bằng tiếng Việt thì trả lời bằng tiếng Việt. Nếu hỏi bằng tiếng Anh thì trả lời bằng tiếng Anh.
    3. Trả lời thân thiện, chuyên nghiệp và ngắn gọn.`;
};
