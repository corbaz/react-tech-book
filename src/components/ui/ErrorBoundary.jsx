import React from "react";
import { AlertTriangle } from "lucide-react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 bg-red-50 text-red-800 rounded-xl border border-red-200 m-4">
          <AlertTriangle size={48} className="mb-4 text-red-500" />
          <h2 className="text-xl font-bold mb-2">Algo salió mal</h2>
          <p className="text-center mb-4 text-sm opacity-90">
            Ha ocurrido un error al cargar este componente.
          </p>
          <pre className="bg-white p-4 rounded border border-red-100 text-xs overflow-auto max-w-full w-full">
            {this.state.error && this.state.error.toString()}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
          >
            Recargar página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
