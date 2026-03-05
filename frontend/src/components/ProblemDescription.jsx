import { getDifficultyBadgeClass } from "../lib/utils.js";

function ProblemDescription({
  problem,
  currentProblemId,
  onProblemChange,
  allProblems,
}) {
  if (!problem) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-base-content/60">Loading problem...</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-base-200">

      {/* Header */}
      <div className="p-6 bg-base-100 border-b border-base-300 sticky top-0 z-10">
        <div className="flex items-start justify-between mb-3">
          <h1 className="text-3xl font-bold text-base-content">{problem.title}</h1>

          <span className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}>{problem.difficulty}</span>
        </div>

        <p className="text-base-content/60 text-sm">
          {problem.category}
        </p>

        {/* Problem Selector */}
        <div className="mt-4">
          <select
            className="select select-bordered select-sm w-full bg-base-200"
            value={currentProblemId}
            onChange={(e) => onProblemChange(e.target.value)}
          >
            {allProblems.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} — {p.difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-6 space-y-8">

        {/* PROBLEM DESCRIPTION */}
        <section className="bg-base-100 rounded-xl shadow-sm p-6 border border-base-300">
          <h2 className="text-xl font-bold mb-4 text-base-content">Description</h2>

          <div className="space-y-4 text-base leading-relaxed text-base-content/90">
            <p>{problem.description.text}</p>

            {problem.description.notes?.length > 0 && (
              <ul className="list-disc list-inside space-y-2 text-base-content/80">
                {problem.description.notes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* EXAMPLES SECTION */}
        <section className="bg-base-100 rounded-xl shadow-sm p-6 border border-base-300">
          <h2 className="text-xl font-bold mb-6 text-base-content">Examples</h2>

          <div className="space-y-6">
            {problem.examples?.map((example, idx) => (
              <div key={idx} className="bg-base-200 rounded-lg p-5 border border-base-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="badge badge-primary badge-sm">{idx + 1}</span>
                  <p className="font-semibold text-base-content">Example {idx + 1}</p>
                </div>

                {/* Input */}
                <div className="mb-3">
                  <p className="text-primary font-semibold mb-1">Input:</p>
                  <pre className="bg-base-100 p-3 rounded text-sm font-mono overflow-x-auto">{example.input}</pre>
                </div>

                {/* Output */}
                <div className="mb-3">
                  <p className="text-success font-semibold mb-1">Output:</p>
                  <pre className="bg-base-100 p-3 rounded text-sm font-mono overflow-x-auto">{example.output}</pre>
                </div>

                {/* Explanation */}
                {example.explanation && (
                  <div>
                    <p className="text-accent font-semibold mb-1">Explanation:</p>
                    <p className="text-sm text-base-content/80 leading-relaxed">{example.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CONSTRAINTS */}
        <section className="bg-base-100 rounded-xl shadow-sm p-6 border border-base-300">
          <h2 className="text-xl font-bold mb-4 text-base-content">Constraints</h2>

          <ul className="list-disc list-inside space-y-2 text-base-content/80 font-mono text-sm">
            {problem.constraints?.map((constraint, idx) => (
              <li key={idx}>{constraint}</li>
            ))}
          </ul>
        </section>


      </div>
    </div>
  );
}

export default ProblemDescription;