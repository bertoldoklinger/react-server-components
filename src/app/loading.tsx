import { Spinner } from "./components/spinner";

export default function Loading() {
  return (
        <div className="bg-gray-50 h-screen flex items-center justify-center">
            <Spinner className="w-8 animate-spin" />
        </div>
        )
}