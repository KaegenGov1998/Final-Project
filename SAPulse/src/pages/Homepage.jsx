
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const CATEGORIES = ['All', 'Politics', 'Economy', 'Sport', 'Tech', 'Health'];

const DUMMY_POSTS = [
  {
    id: 1,
    title: "South Africa's Economy Shows Signs of Recovery in Q2",
    body: "The latest data from the Reserve Bank indicates a 1.8% GDP growth, driven by a resurgence in mining output and consumer spending. Analysts remain cautiously optimistic heading into the second half of the year.",
    author: "Lerato Dlamini",
    date: "2026-05-03",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
    category: "Economy",
  },
  {
    id: 2,
    title: "Bafana Bafana Secure AFCON Qualification With Late Winner",
    body: "Hugo Broos' side sealed their spot in the Africa Cup of Nations after a dramatic 94th-minute goal from Percy Tau sealed a 2-1 victory in Lusaka. The nation erupts in celebration.",
    author: "Sipho Nkosi",
    date: "2026-05-02",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80",
    category: "Sport",
  },
  {
    id: 3,
    title: "Load Shedding Finally Ends - Eskom Announces Stage 0 Indefinitely",
    body: "In a landmark announcement, Eskom confirmed that South Africa has reached a surplus in generation capacity for the first time since 2007. Solar and wind investment has been credited as a key driver.",
    author: "Zanele Mokoena",
    date: "2026-05-01",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
    category: "Politics",
  },
  {
    id: 4,
    title: "Cape Town Ranked Africa's Top Smart City for 2026",
    body: "A new continental report places Cape Town first for digital infrastructure, fibre rollout, and e-government services. The city's tech hub ecosystem has attracted over R4bn in investment this year.",
    author: "Kaegen Govender",
    date: "2026-04-30",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&q=80",
    category: "Tech",
  },
  {
    id: 5,
    title: "NHI Rollout Begins in Three Pilot Provinces",
    body: "The National Health Insurance scheme has commenced its first operational phase in Gauteng, the Western Cape, and KwaZulu-Natal, with over 200 clinics onboarded to the digital portal.",
    author: "Dr. Amahle Sithole",
    date: "2026-04-28",
    image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=600&q=80",
    category: "Health",
  },
  {
    id: 6,
    title: "GNU Coalition Reaches Budget Compromise After Weeks of Talks",
    body: "The Government of National Unity has agreed on a R2.1 trillion budget framework, averting a constitutional crisis. Key concessions were made on social grants and infrastructure spending.",
    author: "Thabo Mahlangu",
    date: "2026-04-26",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&q=80",
    category: "Politics",
  },
];

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-ZA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

const Homepage = ({ token }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const filtered =
    activeCategory === 'All'
      ? DUMMY_POSTS
      : DUMMY_POSTS.filter((p) => p.category === activeCategory);

  return (
    <div className="flex flex-row bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1 px-8 py-8 overflow-y-auto">

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back,{' '}
            <span className="text-blue-950">
              {token?.user?.user_metadata?.full_name ?? 'Reader'}
            </span>
          </h1>
          <p className="text-gray-500 mt-1">Here is what is happening in South Africa today.</p>
        </div>

        <div className="flex flex-row gap-2 mb-8 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-blue-950 text-white border-blue-950'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-950 hover:text-blue-950'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-5 flex flex-col flex-1">
                <span className="inline-block self-start text-xs font-semibold uppercase tracking-wide text-blue-950 bg-blue-50 px-2 py-0.5 rounded mb-3">
                  {post.category}
                </span>

                <h2 className="text-base font-bold text-gray-900 leading-snug mb-2">
                  {post.title}
                </h2>

                <p className="text-sm text-gray-500 leading-relaxed flex-1">
                  {expandedId === post.id
                    ? post.body
                    : post.body.length > 100
                    ? post.body.slice(0, 100) + '...'
                    : post.body}
                </p>

                <button
                  onClick={() => setExpandedId(expandedId === post.id ? null : post.id)}
                  className="text-xs text-blue-950 font-semibold mt-2 self-start hover:underline cursor-pointer"
                >
                  {expandedId === post.id ? 'Show less' : 'Read more'}
                </button>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-950 flex items-center justify-center text-white text-xs font-bold">
                      {post.author.charAt(0)}
                    </div>
                    <span className="text-xs text-gray-600 font-medium">{post.author}</span>
                  </div>
                  <span className="text-xs text-gray-400">{formatDate(post.date)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <p className="text-lg font-medium">No posts in this category yet.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Homepage;
