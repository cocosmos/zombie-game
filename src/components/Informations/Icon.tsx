import { icons } from "../../assets/svg";

type IconProps = {
  name: string;
  size?: number;
  color?: string;
};

const Icon = ({ name, size, color }: IconProps) => {
  let iconFinded = { name: "", icon: "" };
  icons.forEach((icon) => {
    if (icon.name === name) {
      iconFinded = icon;
    }
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className="icon"
      style={{ width: size + "px", height: size + "px" }}
    >
      <path fill={color ?? "currentColor"} d={iconFinded.icon} />
    </svg>
  );
};

export default Icon;
