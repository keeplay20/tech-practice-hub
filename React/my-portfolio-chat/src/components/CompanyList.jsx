import React from "react";
import { motion } from "framer-motion";
import { cars } from "../data/cars";
import SpeedLines from "./SpeedLines";

const CompanyList = ({
  companies,
  onCompanyClick,
  activeCompany,
  category,
}) => {
  const [selectedId, setSelectedId] = React.useState(null);

  const handleClick = (id) => {
    setSelectedId(id);
    onCompanyClick(id);
  };
  return (
    <div className="w-screen overflow-x-auto scrollbar-none lg:w-full">
      <div className="flex lg:flex-col w-[1200px] pb-2 pt-1 gap-2 px-2 lg:px-0 lg:w-full mask-fade-right">
        {companies.map((company, index) => (
          <motion.button
            key={company.id}
            onClick={() => handleClick(company.id)}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: selectedId && selectedId !== company.id ? 0.95 : 1,
              transition: {
                delay: selectedId === company.id ? 0 : index * 0.1,
                duration: 0.3,
                type: "spring",
                stiffness: 100,
              },
            }}
            className={`px-3 lg:px-4 py-2 lg:py-2 rounded-lg transition-all duration-300 backdrop-blur-sm flex items-center justify-center w-[200px] h-auto min-h-[40px] lg:min-w-0 lg:w-auto
                     ${
                       activeCompany === company.id
                         ? `bg-[#15151E]`
                         : `bg-[#15151E]`
                     }
                     relative group overflow-hidden`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Speed Lines Animation */}
            {activeCompany === company.id && <SpeedLines color="#FF1801" />}

            <div className="flex items-center gap-2 relative z-10 w-full">
              <div className="w-full flex flex-col justify-center items-center space-y-0.5">
                <div
                  className={`text-sm lg:text-sm break-words font-medium text-center ${
                    activeCompany === company.id
                      ? "bg-gradient-to-r from-[#FF1801] to-[#FF8F00] text-transparent bg-clip-text"
                      : "text-white/90"
                  }`}
                >
                  {company.name}
                </div>
                {company.role && (
                  <div className="hidden lg:block text-[11px] text-gray-400 font-light tracking-wide truncate mt-0.5">
                    {company.role}
                  </div>
                )}
                {company.duration && (
                  <div className="hidden lg:block text-[10px] text-[#FF1801]/40 font-medium tracking-widest uppercase mt-0.5">
                    {company.duration}
                  </div>
                )}
              </div>
            </div>

            {/* Speed lines on active */}
            {activeCompany === company.id && (
              <motion.div
                className="absolute inset-0 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-[1px] bg-[#FF1801] opacity-20"
                    style={{
                      left: `${i * 30}%`,
                      top: `${50 + i * 10}%`,
                      width: "40%",
                    }}
                    animate={{
                      x: ["0%", "100%"],
                      opacity: [0.2, 0],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "linear",
                    }}
                  />
                ))}
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
