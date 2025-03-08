"use client";
import React from "react";

function MainComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentDocuments, setRecentDocuments] = useState([]);
  const [error, setError] = useState(null);

  const popularCategories = [
    { name: "Informatique", icon: "fa-laptop-code" },
    { name: "Économie", icon: "fa-chart-line" },
    { name: "Médecine", icon: "fa-user-md" },
    { name: "Droit", icon: "fa-balance-scale" },
    { name: "Sciences", icon: "fa-flask" },
    { name: "Littérature", icon: "fa-book" },
  ];

  useEffect(() => {
    const fetchRecentDocuments = async () => {
      try {
        const response = await fetch("/api/get-documents", {
          method: "POST",
          body: JSON.stringify({ limit: 6 }),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des documents");
        }

        const data = await response.json();
        if (data.success) {
          setRecentDocuments(data.documents);
        }
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les documents récents");
      }
    };

    fetchRecentDocuments();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = `/documents?search=${encodeURIComponent(
      searchQuery
    )}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 font-roboto">
            Trouvez les meilleurs documents académiques
          </h1>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex shadow-lg rounded-lg overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher des documents..."
                className="flex-1 px-6 py-4 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-4 hover:bg-blue-700"
              >
                <i className="fas fa-search mr-2"></i>
                Rechercher
              </button>
            </div>
          </form>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 font-roboto">
            Documents récents
          </h2>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentDocuments.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold mb-2 truncate">{doc.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {doc.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {doc.author_university}
                  </span>
                  <a
                    href={`/document/${doc.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Voir plus
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 font-roboto">
            Catégories populaires
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularCategories.map((category) => (
              <a
                key={category.name}
                href={`/documents?subject=${encodeURIComponent(category.name)}`}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <i
                  className={`fas ${category.icon} text-2xl text-blue-600 mb-3`}
                ></i>
                <p className="font-medium">{category.name}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="bg-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-semibold mb-4 font-roboto">
            Partagez vos connaissances
          </h2>
          <p className="mb-6">
            Rejoignez notre communauté et partagez vos documents académiques
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/upload"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              Uploader un document
            </a>
            <a
              href="/signup"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800"
            >
              S'inscrire
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MainComponent;