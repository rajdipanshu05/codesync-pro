import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const difficultyColors = {
  Easy: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  Hard: "bg-red-500/15 text-red-400 border-red-500/20",
};

const ProblemCard = ({ problem }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/problems/${problem.id}`)}
      className="
        group
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        p-5
        cursor-pointer
        hover:border-blue-500/40
        hover:bg-zinc-900/80
        transition-all
      "
    >
      {/* TOP */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3
            className="
              text-lg
              font-semibold
              text-white
              group-hover:text-blue-400
              transition-all
            "
          >
            {problem.title}
          </h3>

          <p className="text-sm text-zinc-500 mt-1">
            {problem.acceptance || "65%"} Acceptance
          </p>
        </div>

        {problem.solved && (
          <CheckCircle2
            size={20}
            className="text-emerald-400 shrink-0"
          />
        )}
      </div>

      {/* DIFFICULTY */}
      <div className="mt-4">
        <span
          className={`
            px-3
            py-1
            rounded-full
            text-xs
            font-medium
            border

            ${difficultyColors[problem.difficulty]}
          `}
        >
          {problem.difficulty}
        </span>
      </div>

      {/* TAGS */}
      <div className="flex flex-wrap gap-2 mt-4">
        {problem.topics.map((topic) => (
          <span
            key={topic}
            className="
              px-2.5
              py-1
              rounded-lg

              bg-zinc-800
              text-zinc-300

              text-xs
            "
          >
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProblemCard;