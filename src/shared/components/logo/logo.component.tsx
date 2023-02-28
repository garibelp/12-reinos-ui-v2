import Logo from "../../../assets/images/logo_2_white.png";

export function LogoComponent({ className }: { className?: string }) {
  return <img className={className} src={Logo} alt="" />;
}
