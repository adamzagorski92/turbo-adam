import { useTranslation } from "react-i18next";

interface Page404Props {
  i18nKey: string;
}

const Page404 = ({ i18nKey }: Page404Props) => {
  const { t } = useTranslation("UI");

  return <p>{t(i18nKey)}</p>;
};

export default Page404;
