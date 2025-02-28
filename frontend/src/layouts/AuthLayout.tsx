import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="w-full h-full grid grid-cols-2">
      <div style={{
        height: '100%',
        width: '100%',
        backgroundImage: 'url("/background.webp")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}></div>
      <div className="h-full w-full flex items-center">
        <div className="w-full mr-12 ml-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
}