// src/components/FileItem.jsx
import { FILES_BASE_PATH } from "../fileData";

const getFileExtension = (filename) => {
  return filename.split(".").pop()?.toLowerCase() || "file";
};

const getFileNameWithoutExtension = (filename) => {
  // Busca la posición del último punto
  const lastDotIndex = filename.lastIndexOf(".");
  // Si no hay punto o está al inicio (como en '.gitignore'), devuelve el nombre completo
  if (lastDotIndex === -1 || lastDotIndex === 0) {
    return filename;
  }
  // Devuelve la subcadena desde el inicio hasta el último punto
  return filename.substring(0, lastDotIndex);
};

const getIconClasses = (ext) => {
  let iconClass = "bg-gray-500"; // Default
  let iconText = ext.toUpperCase();

  switch (ext) {
    case "pdf":
    case "exe":
      iconClass = "bg-red-600";
      break;
    case "xml":
      iconClass = "bg-green-600";
      break;
    case "zip":
    case "rar":
      iconClass = "bg-yellow-400 text-gray-800";
      break; // Tailwind no permite colores de texto en bg-yellow-400
    case "png":
    case "jpg":
    case "jpeg":
      iconClass = "bg-blue-600";
      break;
    case "xlsx":
    case "docx":
      iconClass = "bg-teal-500";
      break;
    default:
      iconClass = "bg-gray-500";
  }

  return { iconClass, iconText };
};

const FileItem = ({ file }) => {
  const extension = getFileExtension(file.name);
  const { iconClass, iconText } = getIconClasses(extension);
  const fileNameDisplay = getFileNameWithoutExtension(file.name);

  const handleDownload = () => {
    const filePath = FILES_BASE_PATH + file.name;
    const link = document.createElement("a");
    link.href = filePath;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex items-center justify-between p-5 bg-gray-50 border border-gray-200 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:translate-x-1 hover:shadow-md max-sm:flex-col max-sm:gap-4 max-sm:text-center">
      <div className="flex items-center gap-4 flex-1 max-sm:flex-col max-sm:text-center">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xs text-white ${iconClass}`}
        >
          {iconText === "EXE" ? "PDF" : iconText}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-gray-800 mb-1 text-base">
            {fileNameDisplay}
          </div>
          <div className="text-sm text-gray-500">
            {file.size} • {file.date}
          </div>
        </div>
      </div>
      <button
        className="bg-blue-600 text-white border-none py-2.5 px-5 rounded-md text-sm font-medium cursor-pointer transition-all duration-300 flex items-center gap-2 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg"
        onClick={handleDownload}
      >
        <span>⬇</span> Descargar
      </button>
    </div>
  );
};

export default FileItem;
