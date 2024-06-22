import { cn } from "@/lib/utils";
import React from "react";

function SEALogo({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      fill="#000000"
      height="800px"
      width="800px"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 342.999 342.999"
      xmlSpace="preserve"
      className={cn(className)}
      {...props}
    >
      <g>
        <path d="M154.074,0c2.624,35.486,2.624,70.758,0,106.241h37.775c-2.623-35.484-2.623-70.755,0-106.241H154.074z" />
        <path d="M154.074,116.879c2.624,35.484,2.624,70.758,0,106.242h37.775c-2.623-35.484-2.623-70.758,0-106.242H154.074z" />
        <path d="M154.074,233.759c2.624,35.483,2.624,70.756,0,106.241h37.775c-2.623-35.485-2.623-70.757,0-106.241H154.074z" />
        <path d="M81.714,159.667c2.625,29.155,2.625,58.14,0,87.296h37.775c-2.623-29.156-2.623-58.139,0-87.296H81.714z" />
        <path d="M81.714,255.703c2.625,29.156,2.625,58.139,0,87.296h37.775c-2.623-29.157-2.623-58.139,0-87.296H81.714z" />
        <path
          d="M123.528,80.791c-22.254-7.593-43.805-3.461-43.805-3.461s14.53,16.443,36.783,24.037
		c22.255,7.594,29.584-1.391,29.584-1.391S145.783,88.385,123.528,80.791z"
        />
        <path
          d="M120.602,58.996c0,0,2.807,12.433,12.019,22.517c9.214,10.083,15.456,7.554,15.456,7.554s3.08-5.988-6.132-16.071
		C132.733,62.91,120.602,58.996,120.602,58.996z"
        />
        <path
          d="M124.144,106.355c-13.454,2.35-23.276,10.473-23.276,10.473s11.993,4.316,25.449,1.967
		c13.454-2.349,14.677-8.972,14.677-8.972S137.599,104.007,124.144,106.355z"
        />
        <path
          d="M219.455,199.587c-22.293,7.482-22.659,19.071-22.659,19.071s7.284,9.021,29.577,1.539
		c22.291-7.482,36.903-23.853,36.903-23.853S241.746,192.105,219.455,199.587z"
        />
        <path
          d="M201.843,228.531c0,0,1.19,6.629,14.632,9.045c13.443,2.417,25.458-1.84,25.458-1.84s-9.78-8.173-23.223-10.59
		C205.267,222.731,201.843,228.531,201.843,228.531z"
        />
        <path
          d="M210.357,200.262c9.262-10.037,12.131-22.456,12.131-22.456s-12.148,3.854-21.413,13.893
		c-9.262,10.037-6.212,16.042-6.212,16.042S201.094,210.299,210.357,200.262z"
        />
      </g>
    </svg>
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   xmlnsXlink="http://www.w3.org/1999/xlink"
    //   width="334"
    //   height="334"
    //   viewBox="0 0 334 334"
    // className={cn(className)}
    // {...props}
    // >
    //   <image
    //     id="Layer_1_copy"
    //     data-name="Layer 1 copy"
    //     x="34"
    //     y="43"
    //     width="236"
    //     height="248"
    //     xlinkHref="data:img/png;base64,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"
    //   />
    // </svg>
  );
}

export default SEALogo;
