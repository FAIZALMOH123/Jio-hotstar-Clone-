// components/common/Button.jsx

const Button = ({ children, ...props }) => {
  return (
    <button
      className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2
      mt-3
             bg-linear-to-r from-blue-500 via-purple-500 to-pink-500
             text-white font-semibold text-base
             shadow-lg shadow-purple-500/20
             transition-all duration-300
             hover:scale-[1.02]
             hover:shadow-xl
             active:scale-[0.98]
             disabled:opacity-50 disabled:cursor-not-allowed"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
