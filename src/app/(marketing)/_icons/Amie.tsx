import { type ComponentProps } from "react";

export function AmieIcon(svgProps: ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 78"
      {...svgProps}
    >
      <g filter="url(#filter0_i_10140_42656)">
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M87.443 24.71c0 4.704-1.736 9.003-4.602 12.29a18.638 18.638 0 014.602 12.29c0 10.333-8.377 18.71-18.71 18.71-4.81 0-9.197-1.815-12.512-4.797A18.641 18.641 0 0143.711 68C33.377 68 25 59.623 25 49.29c0-4.704 1.736-9.003 4.601-12.29A18.639 18.639 0 0125 24.71C25 14.378 33.377 6 43.71 6c4.81 0 9.197 1.815 12.511 4.797A18.642 18.642 0 0168.732 6c10.334 0 18.71 8.377 18.71 18.71zM56.22 22.83a5.536 5.536 0 00-5.535 5.535v17.272a5.536 5.536 0 1011.071 0V28.364a5.536 5.536 0 00-5.536-5.535z"
          clipRule="evenodd"
        ></path>
      </g>
      <path
        fill="#fff"
        d="M163.926 33.437c2.91 0 4.449 1.964 4.449 5.683v14.515c0 .496.398.896.891.896h3.962c.493 0 .891-.4.891-.896V37.37c0-2.748-.82-5.09-2.376-6.76-1.563-1.683-3.753-2.57-6.338-2.57-3.112 0-5.726 1.18-7.996 3.612l-.083.09-.065-.102c-1.502-2.353-3.855-3.6-6.794-3.6-2.905 0-5.275 1.096-7.051 3.257l-.167.206v-2.066a.894.894 0 00-.891-.899h-3.963c-.492 0-.891.4-.891.899v24.19c0 .497.399.898.891.898h3.963c.492 0 .891-.4.891-.897V39.264c0-2.229.902-3.587 1.657-4.342a5.138 5.138 0 013.587-1.49c2.911 0 4.449 1.963 4.449 5.682V53.63c0 .496.399.897.891.897h3.963c.492 0 .891-.4.891-.897V39.264c0-2.229.902-3.587 1.657-4.342a5.143 5.143 0 013.582-1.485zm54.672 7.425c0-3.599-1.04-6.825-2.924-9.09-2.031-2.443-4.976-3.731-8.511-3.731-3.44 0-6.571 1.383-8.82 3.9-2.229 2.485-3.453 5.903-3.453 9.622 0 7.958 5.151 13.52 12.522 13.52 4.712 0 8.596-2.324 10.592-6.264a.889.889 0 00-.483-1.257l-3.188-1.214a.884.884 0 00-1.123.471c-.993 2.133-3.095 3.372-5.792 3.372-3.884 0-6.575-2.803-7.021-7.317l-.012-.108h17.328a.895.895 0 00.891-.898v-1.006h-.006zm-17.939-2.395l.029-.12c.874-3.467 3.214-5.46 6.427-5.46 3.397 0 5.631 2.15 5.685 5.478v.096h-12.141v.006zm-67.728 14.85l-12.712-33.82a.893.893 0 00-.832-.58h-5.807a.893.893 0 00-.832.58l-12.711 33.82a.895.895 0 00.831 1.214h4.17a.89.89 0 00.837-.586l2.274-6.149h16.531l2.311 6.155c.132.349.463.58.831.58h4.271a.886.886 0 00.736-.385.902.902 0 00.102-.83zm-22.785-10.91l6.212-16.778 6.302 16.777h-12.514zm67.97-12.963v3.579c0 .498.399.899.891.899h4.396v19.713c0 .496.398.898.891.898h3.962a.894.894 0 00.891-.898V29.444a.893.893 0 00-.891-.899h-9.254c-.487 0-.886.4-.886.899zm5.191-9.629v4.143c0 .498.399.899.891.899h4.166c.492 0 .891-.401.891-.9v-4.142a.894.894 0 00-.891-.899h-4.166a.897.897 0 00-.891.9z"
      ></path>
      <defs>
        <filter
          id="filter0_i_10140_42656"
          width="62.443"
          height="66"
          x="25"
          y="2"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="-4"></feOffset>
          <feGaussianBlur stdDeviation="11.5"></feGaussianBlur>
          <feComposite
            in2="hardAlpha"
            k2="-1"
            k3="1"
            operator="arithmetic"
          ></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.19 0"></feColorMatrix>
          <feBlend
            in2="shape"
            result="effect1_innerShadow_10140_42656"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}
