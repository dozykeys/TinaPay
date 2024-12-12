import { MotionSection } from "../utils/Motion";

const StarWrapper = (Component: any, idName: any) =>
  function HOC() {
    return (
      <MotionSection
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, type: "tween", ease: "easeInOut" }}
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>

        <Component />
      </MotionSection>
    );
  };

export default StarWrapper;
