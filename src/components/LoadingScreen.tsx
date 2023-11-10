import { CircularProgress, LinearProgress, Stack } from "@mui/material";
import { useState, useEffect } from "react";

const LoadingScreen = () => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          setVisible(false);
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 60);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <>
      {visible && (
        <div className="w-screen h-screen bg-white fixed inset-0 flex flex-col gap-5 items-center justify-center">
          <img
            src="https://irbcontas.org.br/wp-content/uploads/2020/03/associado-titular-logo-tce-to.png"
            alt="Logo do TCE-TO"
            className="Header-logo w-20 h-auto m-1 shadow-xl"
          />
          <div className="w-[25%]">
            <Stack sx={{ color: "#2e77b4" }}>
              <LinearProgress
                sx={{ height: 10, borderRadius: 5 }}
                variant="determinate"
                value={progress}
                color="inherit"
              />
            </Stack>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingScreen;
