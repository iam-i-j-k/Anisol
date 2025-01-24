import React, { useState } from "react";
import {
  Brain,
  FileText,
  Settings,
  Wand2,
  Copy,
  Download,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Navbar from "../components/Navbar";
import toast, { Toaster } from 'react-hot-toast';


const ContentGenerator = () => {
  const notify = () => toast.success('Parameters Applied Successfully.');
  const [preferences, setPreferences] = useState({
    tone: "professional",
    length: "medium",
    keywords: [],
    industry: "technology",
    contentType: "blog",
  });

  const [parameters, setParameters] = useState({
    topic: "",
    tone: "formal",
    length: "medium",
    targetAudience: "",
  });

  const [content, setContent] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [history, setHistory] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.REACT_APP_API_URL || "https://anisol-1.onrender.com/generate-content";


  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt for content generation");
      return;
    }

    setError(null);
    setIsGenerating(true);

    try {
      const response = await axios.post(API_URL, {
        prompt,
        preferences,
      });

      setContent(response.data);
      setHistory(prev => [
        {
          id: Date.now().toString(),
          prompt,
          content: response.data,
          preferences,
        },
        ...prev,
      ]);
    } catch (err) {
      console.error("Error generating content:", err);
      setError(
        err.response?.data?.message ||
        "Failed to generate content. Please try again later."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyContent = async () => {
    if (content) {
      try {
        await navigator.clipboard.writeText(content.content);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        setError("Failed to copy content");
      }
    }
  };

  const handleDownload = () => {
    if (content) {
      const element = document.createElement("a");
      const file = new Blob(
        [
          `Title: ${content.title}\n\n${content.content}\n\nGenerated on: ${content.timestamp}
          \nSEO Score: ${content.seoScore}
          \nReadability Score: ${content.readabilityScore}
          \nKeyword Density: ${content.keywordDensity}% 
          \nWord Count: ${content.wordCount}`,
        ],
        { type: "text/plain" }
      );
      element.href = URL.createObjectURL(file);
      element.download = `content-${Date.now()}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const applyParameters = () => {
    setPreferences(prev => ({
      ...prev,
      tone: parameters.tone,
      length: parameters.length,
      keywords: parameters.targetAudience
        .split(",")
        .map(k => k.trim())
        .filter(k => k),
      industry: parameters.topic,
    }));
    notify();
  };

  return (
    <div className="min-h-screen bg-gradient-to-tl from-red-400 to-indigo-400 py-20">
        <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Wand2 className="h-5 w-5 mr-2 text-indigo-600" />
                Content Generator
              </h2>
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  {error}
                </div>
              )}
              <textarea
                className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Describe the content you want to generate..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button
                className={`mt-4 w-full py-2 px-4 rounded-lg text-white font-medium ${
                  isGenerating
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? "Generating..." : "Generate Content"}
              </button>
            </div>

            {content && (
              <div className="bg-white rounded-xl shadow-sm p-6 h-auto overflow-auto">
                <h3 className="text-lg font-semibold">{content.title}</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleCopyContent}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    aria-label="Copy content"
                  >
                    {copySuccess ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5 text-gray-600" />
                    )}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    aria-label="Download content"
                  >
                    <Download className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                <ReactMarkdown className="prose mt-4 text-wrap ">
                  {content.content}
                </ReactMarkdown>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-semibold flex items-center">
              <Settings className="h-5 w-5 mr-2 text-indigo-600" />
              Content Parameters
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Topic
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter a topic (e.g., Web Development)"
                  value={parameters.topic}
                  onChange={(e) =>
                    setParameters({ ...parameters, topic: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tone
                </label>
                <select
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={parameters.tone}
                  onChange={(e) =>
                    setParameters({ ...parameters, tone: e.target.value })
                  }
                >
                  <option value="formal">Formal</option>
                  <option value="conversational">Conversational</option>
                  <option value="casual">Casual</option>
                  <option value="technical">Technical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Length
                </label>
                <select
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={parameters.length}
                  onChange={(e) =>
                    setParameters({ ...parameters, length: e.target.value })
                  }
                >
                  <option value="short">Short Summary</option>
                  <option value="medium">Detailed Article</option>
                  <option value="long">Extended Blog</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Target Audience
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="E.g., Developers, Students, Age 20-30"
                  value={parameters.targetAudience}
                  onChange={(e) =>
                    setParameters({
                      ...parameters,
                      targetAudience: e.target.value,
                    })
                  }
                />
              </div>
              <button
                onClick={applyParameters}
                className="cursor-pointer mt-4 w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
              >
                Apply Parameters
              </button>
              <Toaster />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContentGenerator;
