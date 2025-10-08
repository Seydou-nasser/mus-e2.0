import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("about.title")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t("about.subtitle")}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t("about.museum.title")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {t("about.museum.description")}
          </p>
        </div>


        {/* Project Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t("about.project.title")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {t("about.project.description")}
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
            {t("about.project.features.title")}
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              {t("about.project.features.scan")}
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              {t("about.project.features.multilingual")}
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              {t("about.project.features.audio")}
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              {t("about.project.features.accessible")}
            </li>
          </ul>
        </div>

        {/* Hackathon Info */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4">
            {t("about.hackathon.title")}
          </h2>
          <p className="leading-relaxed mb-4">
            {t("about.hackathon.description")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-sm opacity-90">
                {t("about.hackathon.organizer")}
              </div>
              <div className="text-xl font-bold">Senstartup</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-sm opacity-90">
                {t("about.hackathon.event")}
              </div>
              <div className="text-xl font-bold">Dakar Slush'D 2025</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
