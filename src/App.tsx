import { lazy, Suspense, useEffect, useRef } from "react";
import "./App.css";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { LoadingProvider } from "./context/LoadingProvider";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));

const App = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let locoScroll: any = null;
    if (scrollRef.current) {
      locoScroll = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        multiplier: 1.7,
        smartphone: { smooth: true },
        tablet: { smooth: true },
      });
    }
    const handleResize = () => {
      locoScroll && locoScroll.update();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      locoScroll && locoScroll.destroy();
      locoScroll = null;
    };
  }, []);

  return (
    <div id="smooth-content" ref={scrollRef}>
      {/* ✅ All your app content goes inside here */}
      <LoadingProvider>
        <Suspense>
          <MainContainer>
            <Suspense>
              <CharacterModel />
            </Suspense>
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </div>
  );
};

export default App;