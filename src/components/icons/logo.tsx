import { ComponentProps, FC } from "react";

const Logo: FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="none"
      viewBox="0 0 512 512"
      {...props}
    >
      <rect
        id="r4"
        width="511"
        height="511"
        x="0.5"
        y="0.5"
        fill="#121212"
        stroke="#525252"
        strokeOpacity="100%"
        strokeWidth="1"
        paintOrder="stroke"
        rx="128"
      ></rect>
      <clipPath>
        <use xlinkHref="#r4"></use>
      </clipPath>
      <defs>
        <linearGradient
          gradientTransform="rotate(45)"
          gradientUnits="userSpaceOnUse"
          style={{
            WebkitTransformOrigin: "center center",
            transformOrigin: "center center",
          }}
        >
          <stop stopColor="#121212"></stop>
          <stop offset="1" stopColor="#3E5151"></stop>
        </linearGradient>
        <radialGradient
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(0 512 -512 0 256 0)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff"></stop>
          <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
        </radialGradient>
      </defs>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="280"
        height="280"
        x="116"
        y="116"
        alignmentBaseline="middle"
        color="#C7C7C7"
        viewBox="0 0 16 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M8.75 2v3.25a1 1 0 001 1H13m.25.164v5.836a2 2 0 01-2 2h-6.5a2 2 0 01-2-2v-8.5a2 2 0 012-2h3.836a1 1 0 01.707.293l3.664 3.664a1 1 0 01.293.707z"
        ></path>
      </svg>
    </svg>
  );
};

export default Logo;
