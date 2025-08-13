import React from "react";

interface RoleGuardProps {
  allowedRoles: string[];
  userRole: string | null;
  children: JSX.Element;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, userRole, children }) => {
  if (!userRole || !allowedRoles.includes(userRole)) {
    return null; // kuch render nahi karega
  }
  return children;
};

export default RoleGuard;