import Logo from "../../assets/images/logo.png";

export function LogoComponent({ className }: { className?: string }) {
  return <img className={className} src={Logo} alt="" />;
}
