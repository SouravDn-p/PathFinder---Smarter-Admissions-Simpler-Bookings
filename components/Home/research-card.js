import { Bookmark, Download, Eye, Heart } from "lucide-react";

export default function ResearchCard({ paper, hovered, onHover, onLeave }) {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`bg-gradient-to-br ${paper.bgColor} p-5 rounded-2xl shadow-md hover:shadow-lg transition duration-300`}
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white text-gray-800">
          {paper.category}
        </span>
        <Bookmark
          size={18}
          className="text-gray-500 hover:text-indigo-500 cursor-pointer"
        />
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-2">{paper.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{paper.description}</p>

      <div className="text-xs text-gray-500 mb-4">
        <p>
          <span className="font-medium text-gray-700">Institution:</span>{" "}
          {paper.institution}
        </p>
        <p>
          <span className="font-medium text-gray-700">Funding:</span>{" "}
          {paper.funding}
        </p>
        <p>
          <span className="font-medium text-gray-700">Read Time:</span>{" "}
          {paper.readTime}
        </p>
      </div>

      <div className="flex justify-between items-center text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <Eye size={16} className="text-blue-500" />
          <span>{paper.views}</span>
        </div>
        <div className="flex items-center gap-2">
          <Download size={16} className="text-green-500" />
          <span>{paper.downloads}</span>
        </div>
        <div className="flex items-center gap-2">
          <Heart size={16} className="text-red-500" />
          <span>{paper.likes}</span>
        </div>
      </div>
    </div>
  );
}
