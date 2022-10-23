import { useTranslation } from "react-i18next";
import { useState } from "react";
import { IoAlertCircle } from "react-icons/io5";
import classNames from "classnames";

function displayError(error) {
  return JSON.stringify(error[1] ? error[1] : error, null, 4);
}

function displayData(data) {
  return (data.type === 'Buffer') ? Buffer.from(data).toString() : JSON.stringify(data, 4);
}

export default function Error({ error }) {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  function toggleOpen() {
    setOpen(!open);
  }
  
  if (error?.data?.error) {
    error = error.data.error; // eslint-disable-line no-param-reassign
  }

  return (
    <div className="px-3 pb-3">
      <button className={classNames(
        "text-xs mb-0 p-1 rounded-[3px] bg-rose-900/90 text-theme-800 flex items-center border-rose-900 border",
        open && "mb-2"
       )} onClick={toggleOpen}>
        <IoAlertCircle className="mr-1 w-4 h-4"/>{t("widget.api_error")} {t("widget.information")}
      </button>
      <div className={classNames(
        "bg-white dark:bg-theme-200/30 rounded-[3px] transition-all overflow-hidden text-rose-900 text-xs font-mono whitespace-pre-wrap break-all",
        open && "h-auto",
        !open && "h-0"
      )}>
        <ul className="p-4">
          <li className="mb-2">
            <span className="text-black">{t("widget.api_error")}:</span> {error.message}
          </li>
          {error.url && <li className="mb-2">
            <span className="text-black">{t("widget.url")}:</span> {error.url}
          </li>}
          {error.rawError && <li className="mb-2">
            <span className="text-black">{t("widget.raw_error")}:</span>
            <div className="ml-2">
              {displayError(error.rawError)}
            </div>
          </li>}
          {error.data && <li className="mb-2">
            <span className="text-black">{t("widget.response_data")}:</span>
            <div className="ml-2">
              {displayData(error.data)}
            </div>
          </li>}
        </ul>
      </div>
    </div>
  );
}
