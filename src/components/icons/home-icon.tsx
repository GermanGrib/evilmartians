interface HomeIconProps {
  className?: string;
}

const HomeIcon = ({ className }: HomeIconProps) => (
  <svg className={className} viewBox="0 0 28 27" fill="none">
    <path
      opacity="0.4"
      d="M25.7733 8.18L17.04 1.19333C15.3333 -0.166668 12.6667 -0.180001 10.9733 1.18L2.24 8.18C0.986668 9.18 0.226668 11.18 0.493335 12.7533L2.17333 22.8067C2.56 25.06 4.65333 26.8333 6.93333 26.8333H21.0667C23.32 26.8333 25.4533 25.02 25.84 22.7933L27.52 12.74C27.76 11.18 27 9.18 25.7733 8.18Z"
      fill="currentColor"
    />
    <path
      d="M14 22.5C13.4533 22.5 13 22.0467 13 21.5V17.5C13 16.9533 13.4533 16.5 14 16.5C14.5467 16.5 15 16.9533 15 17.5V21.5C15 22.0467 14.5467 22.5 14 22.5Z"
      fill="currentColor"
    />
  </svg>
);

export default HomeIcon;
