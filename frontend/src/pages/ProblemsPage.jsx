import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import { PROBLEMS } from "../data/problems.js";
import { Link } from "react-router"; // Make sure to use react-router-dom
import { getDifficultyBadgeClass } from '../lib/utils.js';
import { 
  ChevronRightIcon, 
  Code2Icon, 
  SearchIcon, 
  FilterIcon,
  BookOpenIcon,
  CheckCircle2Icon
} from 'lucide-react';

function ProblemsPage() {
  const allProblems = Object.values(PROBLEMS);

  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Extract unique categories for the dropdown filter
  const categories = useMemo(() => {
    const cats = new Set(allProblems.map(p => p.category.split(" • ")[0])); // Get primary category
    return ["All", ...Array.from(cats)];
  }, [allProblems]);

  
  const filteredProblems = useMemo(() => {
    return allProblems.filter((problem) => {
      // 1. Search filter
      const matchesSearch = 
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.description.text.toLowerCase().includes(searchQuery.toLowerCase());
      
      // 2. Difficulty filter
      const matchesDifficulty = difficultyFilter === "All" || problem.difficulty === difficultyFilter;
      
      // 3. Category filter (checking if the problem category contains the selected filter string)
      const matchesCategory = categoryFilter === "All" || problem.category.includes(categoryFilter);

      return matchesSearch && matchesDifficulty && matchesCategory;
    });
  }, [allProblems, searchQuery, difficultyFilter, categoryFilter]);

  // DYNAMIC STATS
  const stats = useMemo(() => {
    return {
      total: filteredProblems.length,
      easy: filteredProblems.filter(p => p.difficulty === "Easy").length,
      medium: filteredProblems.filter(p => p.difficulty === "Medium").length,
      hard: filteredProblems.filter(p => p.difficulty === "Hard").length,
    };
  }, [filteredProblems]);

  // Helper for left border accents on cards
  const getDifficultyBorder = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "border-l-success";
      case "Medium": return "border-l-warning";
      case "Hard": return "border-l-error";
      default: return "border-l-primary";
    }
  };

  return (
    <div className='min-h-screen bg-base-200 font-sans'>
      <Navbar />

      <div className='max-w-7xl mx-auto px-4 py-8 lg:py-12'>
        
        {/* HEADER & DASHBOARD SECTION */}
        <div className='flex flex-col lg:flex-row gap-8 mb-10'>
          
          {/* Header Text */}
          <div className='flex-1'>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              <BookOpenIcon className="size-4" />
              <span>Problem Library</span>
            </div>
            <h1 className='text-4xl lg:text-5xl font-extrabold mb-4 text-base-content'>
              Practice Problems
            </h1>
            <p className='text-lg text-base-content/70 max-w-2xl'>
              Master algorithms and data structures. Filter by difficulty or topic, and track your progress to ace your next coding interview.
            </p>
          </div>

          {/* Quick Stats Dashboard */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4 w-full lg:w-auto shrink-0">
            <div className="bg-base-100 rounded-xl p-4 border border-base-300 shadow-sm flex flex-col items-center justify-center min-w[120px]">
              <span className="text-sm text-base-content/60 font-medium mb-1">Total</span>
              <span className="text-3xl font-bold text-base-content">{stats.total}</span>
            </div>
            <div className="bg-success/10 rounded-xl p-4 border border-success/20 shadow-sm flex flex-col items-center justify-center min-w-[120px]">
              <span className="text-sm text-success/80 font-semibold mb-1">Easy</span>
              <span className="text-3xl font-bold text-success">{stats.easy}</span>
            </div>
            <div className="bg-warning/10 rounded-xl p-4 border border-warning/20 shadow-sm flex flex-col items-center justify-center min-w-[120px]">
              <span className="text-sm text-warning/80 font-semibold mb-1">Medium</span>
              <span className="text-3xl font-bold text-warning">{stats.medium}</span>
            </div>
            <div className="bg-error/10 rounded-xl p-4 border border-error/20 shadow-sm flex flex-col items-center justify-center min-w-[120px]">
              <span className="text-sm text-error/80 font-semibold mb-1">Hard</span>
              <span className="text-3xl font-bold text-error">{stats.hard}</span>
            </div>
          </div>
        </div>

        {/* CONTROLS (SEARCH & FILTERS) */}
        <div className="bg-base-100 p-4 rounded-xl border border-base-300 shadow-sm mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between sticky top-4 z-10">
          
          {/* Search Bar */}
          <div className="relative w-full sm:max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-base-content/40" />
            <input 
              type="text" 
              placeholder="Search problems..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full pl-10 bg-base-200/50 focus:bg-base-100 transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex w-full sm:w-auto gap-3 items-center">
            <FilterIcon className="size-5 text-base-content/50 hidden sm:block" />
            
            <select 
              className="select select-bordered w-full sm:w-[140px] bg-base-200/50"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <option value="All">All Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <select 
              className="select select-bordered w-full sm:w-[160px] bg-base-200/50"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === "All" ? "All Topics" : cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* PROBLEMS LIST */}
        <div className='space-y-4'>
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem) => (
              <Link 
                key={problem.id} 
                to={`/problem/${problem.id}`}
                className={`group flex flex-col sm:flex-row bg-base-100 rounded-xl border border-base-300 border-l-4 ${getDifficultyBorder(problem.difficulty)} shadow-sm hover:shadow-md hover:border-r-primary/30 hover:border-y-primary/30 transition-all duration-200 overflow-hidden`}
              >
                <div className='p-5 sm:p-6 flex-1 flex items-start gap-4'>
                  
                  {/* Left Icon / Status */}
                  <div className="mt-1 shrink-0">
                    <div className="size-12 rounded-xl bg-base-200 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Code2Icon className="size-6 text-base-content/50 group-hover:text-primary transition-colors" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className='flex-1 min-w-0'>
                    <div className='flex flex-wrap items-center gap-3 mb-2'>
                      <h2 className='text-xl font-bold text-base-content group-hover:text-primary transition-colors truncate'>
                        {problem.title}
                      </h2>
                      <span className={`badge border-none font-medium ${getDifficultyBadgeClass(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    </div>
                    
                    <p className='text-sm text-base-content/60 mb-4 line-clamp-2'>
                      {problem.description.text}
                    </p>

                    {/* Topic Tags */}
                    <div className="flex flex-wrap gap-2">
                      {problem.category.split(" • ").map((cat, idx) => (
                        <span key={idx} className="badge badge-sm badge-outline text-base-content/60 border-base-300">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Call to Action Side */}
                <div className="bg-base-200/50 sm:w-48 p-4 sm:p-6 flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 sm:border-l border-base-300 group-hover:bg-primary/5 transition-colors">
                  {/* Placeholder for future "Solved" state */}
                  <div className="flex items-center gap-2 text-base-content/40 text-sm font-medium">
                    <CheckCircle2Icon className="size-4 opacity-50" />
                    <span className="hidden sm:inline">Unsolved</span>
                  </div>
                  
                  <button className="btn btn-primary btn-sm mt-0 sm:mt-4 gap-1 group-hover:scale-105 transition-transform">
                    Solve
                    <ChevronRightIcon className="size-4" />
                  </button>
                </div>
              </Link>
            ))
          ) : (
            /* EMPTY STATE */
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-base-100 rounded-xl border border-base-300 border-dashed">
              <div className="size-20 bg-base-200 rounded-full flex items-center justify-center mb-4">
                <SearchIcon className="size-10 text-base-content/30" />
              </div>
              <h3 className="text-xl font-bold text-base-content mb-2">No problems found</h3>
              <p className="text-base-content/60 max-w-md">
                We couldn't find any problems matching your current search "{searchQuery}" and filters. Try adjusting your criteria.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setDifficultyFilter("All");
                  setCategoryFilter("All");
                }}
                className="btn btn-ghost mt-6 text-primary"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default ProblemsPage;