// app/application-status/page.tsx
// app/application-status/page.tsx
export default function ApplicationStatusPage() {
  return (
    <main className="min-h-screen bg-gray-300 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10"></div>

      {/* Main Card */}
      <div className="w-full max-w-4xl bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl border border-white/20 relative z-10 overflow-hidden">
        {/* Header */}
        <div className="text-center flex flex-col items-center p-4 sm:p-6">
          <h1 className="text-3xl sm:text-4xl font-black text-red-500 mt-4 tracking-tight">
            Application Status
          </h1>
          <div className="h-1 w-32 sm:w-60 bg-gray-300 mt-2"></div>
        </div>

        <div className="p-4 sm:p-8">
          {/* Info Section */}
          <div className="text-center mb-6 sm:mb-8 -mt-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">
              Secure Login Required
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Please authenticate below to access your personalized application dashboard and view real-time status updates.
            </p>
          </div>

          {/* Login Frame */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white">
            {/* Frame Header */}
            <div className="bg-gradient-to-r from-slate-800 to-black p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-white text-xs sm:text-sm font-medium">Secure Portal</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-green-400 text-xs font-medium">SSL</span>
              </div>
            </div>

            {/* Loading Overlay */}
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="text-center">
                <div className="w-10 sm:w-12 h-10 sm:h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto mb-3 sm:mb-4"></div>
                <p className="text-slate-700 text-sm sm:text-base font-medium">
                  Loading Secure Portal...
                </p>
              </div>
            </div>

            {/* Responsive iframe */}
            <iframe
              src="https://www.authpro.com/auth/tedxthaltejyouth/"
              title="Application Status Login"
              className="w-full h-[400px] sm:h-[600px] bg-white"
              style={{ border: "none" }}
            />
          </div>

          {/* Footer */}
          <div className="mt-6 sm:mt-8 text-center px-2">
            <div className="inline-flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 text-xs sm:text-sm text-slate-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-center sm:text-left">
                Your data is encrypted and secure. Having trouble? Contact our support team.
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

