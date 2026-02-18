var googleSheetDictionary = [];

window.addEventListener("DOMContentLoaded", (event) => {
  // Activate Bootstrap scrollspy on the main nav element
  const sideNav = document.body.querySelector("#sideNav");
  if (sideNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#sideNav",
      rootMargin: "0px 0px -40%",
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link"),
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
});

/**
 * Hàm khởi tạo: Tải dữ liệu từ Google Sheet CSV
 * @param {string} csvUrl - Link CSV từ Google Sheet (đã Publish)
 */
async function loadGoogleSheetData(csvUrl) {
  return await $.ajax({
    url: csvUrl,
    dataType: "text",
    success: function (data) {
      // Chuyển đổi CSV text thành Array Objects
      dictionaryData = parseCSV(data);
      googleSheetDictionary = dictionaryData;
      console.log("Đã tải xong dữ liệu:", dictionaryData);
    },
    error: function (err) {
      console.error("Lỗi tải dữ liệu:", err);
    },
  });
}

/**
 * Hàm tìm kiếm nội dung
 * @param {string} code - Mã quốc gia ('en', 'vi')
 * @param {string} search - id hoặc field cần tìm
 * @returns {string} - Kết quả text tìm được
 */
function getContent(code, search) {
  // 1. Kiểm tra dữ liệu đã tải chưa
  if (!googleSheetDictionary || googleSheetDictionary.length === 0) {
    console.warn("Dữ liệu chưa được tải xong.");
    return "";
  }

  // 2. Chuẩn hóa input (xóa khoảng trắng, về chữ thường để so sánh chính xác)
  var searchKey = search.trim();
  console.log('searchkey: "', searchKey, '"');
  var langKey = code.trim().toLowerCase(); // 'en' hoặc 'vi'

  // 3. Tìm dòng dữ liệu khớp với id HOẶC field
  var foundItem = googleSheetDictionary.find(function (item) {
    return item.id === searchKey || item.field === searchKey;
  });

  // 4. Trả về kết quả
  if (foundItem) {
    console.log("foundItem: ", foundItem);

    // Kiểm tra xem ngôn ngữ yêu cầu có tồn tại trong dữ liệu không
    if (foundItem.hasOwnProperty(langKey)) {
      return foundItem[langKey];
    } else {
      return "Language code not found";
    }
  } else {
    console.log("foundItem is not found for searchKey: /", searchKey, "/");
    return ""; // Không tìm thấy
  }
}

/**
 * Hàm hỗ trợ: Parse CSV thành JSON Object
 * Dựa trên cấu trúc ảnh của bạn:
 * Col 0: Id, Col 1: Field, Col 2: English (en), Col 3: Vietnamese (vi)
 */
function parseCSV(csvText) {
  var lines = csvText.split(/\r\n|\n/);
  var result = [];

  // Bắt đầu từ dòng 3 (index 2) vì dòng 1, 2 trong ảnh là Header gộp (Id, Field, Content...)
  // Nếu file CSV thực tế chỉ có 1 dòng header thì sửa i = 1
  for (var i = 2; i < lines.length; i++) {
    var line = lines[i];
    if (!line) continue;

    // Xử lý tách dấu phẩy (Regex này xử lý cả trường hợp nội dung có dấu phẩy nằm trong ngoặc kép)
    var matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];

    // Làm sạch dấu ngoặc kép nếu có
    var rowData = matches.map(function (val) {
      return val.replace(/^"|"$/g, "").trim();
    });

    if (rowData.length >= 4) {
      result.push({
        id: rowData[0], // Cột A
        field: rowData[1], // Cột B
        en: rowData[2], // Cột C (English)
        vi: rowData[3], // Cột D (Vietnamese)
      });
    }
  }
  return result;
}

/**
 * Hàm lấy mã ngôn ngữ người dùng (Chỉ hỗ trợ 'en' và 'vi')
 * Ưu tiên: URL Parameter > Navigator Language
 * @returns {string} 'en' hoặc 'vi'
 */
function getLanguageCode() {
  // 1. Kiểm tra URL Parameter (ví dụ: ?lang=vi)
  const urlParams = new URLSearchParams(window.location.search);
  let lang = urlParams.get("lang");

  // 2. Nếu không có URL Param, sử dụng Navigator
  if (!lang) {
    // Lấy 2 ký tự đầu tiên (ví dụ: "en-US" -> "en")
    lang = (navigator.language || navigator.userLanguage).substring(0, 2);
  }

  // 3. Chuẩn hóa và ràng buộc chỉ hỗ trợ 'en' hoặc 'vi'
  lang = lang.toLowerCase();

  // Nếu là tiếng Việt thì trả về 'vi', tất cả các trường hợp còn lại mặc định là 'en'
  return lang === "vi" ? "vi" : "en";
}

function createNavBar(code) {
  var headings = getContent(code, "headings");
  console.log("headings: ", headings);
}
