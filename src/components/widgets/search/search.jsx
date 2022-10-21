import { useState } from "react";
import useSWR from "swr";
import { useTranslation } from "next-i18next";
import { FiSearch } from "react-icons/fi";
import { SiDuckduckgo, SiMicrosoftbing, SiGoogle, SiBaidu } from "react-icons/si";

const providers = {
  google: {
    name: "Google",
    url: "https://www.google.com/search?q=",
    icon: SiGoogle,
  },
  duckduckgo: {
    name: "DuckDuckGo",
    url: "https://duckduckgo.com/?q=",
    icon: SiDuckduckgo,
  },
  bing: {
    name: "Bing",
    url: "https://www.bing.com/search?q=",
    icon: SiMicrosoftbing,
  },
  baidu: {
    name: "Baidu",
    url: "https://www.baidu.com/s?wd=",
    icon: SiBaidu,
  },
  custom: {
    name: "Custom",
    url: false,
    icon: FiSearch,
  },
};

export default function Search({ options }) {
  const { t } = useTranslation();

  const provider = providers[options.provider];
  const [query, setQuery] = useState("");

  if (!provider) {
    return null;
  }
  
  const { data: privateWidgetOptions } = useSWR(`/api/widgets/search?${new URLSearchParams({ ...options }).toString()}`);

  function handleSubmit(event) {
    const q = encodeURIComponent(query);

    if (provider.url) {
      window.open(`${provider.url}${q}`, options.target || "_blank");
    } else if (privateWidgetOptions?.url) {
      window.open(`${privateWidgetOptions.url}${q}`, options.target || "_blank");
    }

    event.preventDefault();
    event.target.reset();
    setQuery("");
  }

  return (
    <form className="flex-col relative h-8 my-4 min-w-fit grow first:ml-0 ml-4" onSubmit={handleSubmit}>
      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none w-full text-theme-800 dark:text-white" />
      <input
        type="text"
        className="
          overflow-hidden w-full h-full rounded-md
          text-xs text-theme-900 dark:text-white
          placeholder-theme-900 dark:placeholder-white/80
          bg-white/50 dark:bg-white/10
          focus:ring-theme-500 dark:focus:ring-white/50
          focus:border-theme-500 dark:focus:border-white/50
          border border-theme-300 dark:border-theme-200/50"
        placeholder={t("search.placeholder")}
        onChange={(s) => setQuery(s.currentTarget.value)}
        required
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={options.focus}
      />
      <button
        type="submit"
        className="
        absolute right-0.5 bottom-0.5 rounded-r-md px-4 py-2 border-1
        text-white font-medium text-sm
        bg-theme-600/40 dark:bg-white/10
        focus:ring-theme-500 dark:focus:ring-white/50"
      >
        <provider.icon className="text-white w-3 h-3" />
        <span className="sr-only">{t("search.search")}</span>
      </button>
    </form>
  );
}
