import { Redirect } from "expo-router";

export default function Index() {
  // Quando o app abre, redireciona direto para /welcome
  return <Redirect href="/welcome" />;
}
