import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const difficultyColors = {
  Easy: "text-emerald-400",
  Medium: "text-amber-400",
  Hard: "text-rose-400",
};

const ProblemCard = ({ problem }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/problems/${problem.id}`)}
      className="group flex items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl px-5 py-4 cursor-pointer transition-all"
    >
      {/* LEFT — title + topics */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {problem.solved && <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />}
          <h3 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors truncate">
            {problem.title}
          </h3>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {problem.topics.map(topic => (
            <span key={topic} className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 text-xs">
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* RIGHT — difficulty */}
      <span className={`text-xs font-medium shrink-0 ${difficultyColors[problem.difficulty]}`}>
        {problem.difficulty}
      </span>
    </div>
  );
};

export default ProblemCard;