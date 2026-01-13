import { CheckCircle2 } from "lucide-react";
import * as motion from "motion/react-client";
import { Button } from "../../../components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

function EmailVerificationSent({
  setShowVerifyEmail,
}: {
  setShowVerifyEmail: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const pathname = usePathname();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
      className="w-full max-w-[400px] flex gap-4 flex-col p-6 rounded-[1.25rem] border border-[#E6E8EC80] bg-muted shadow-sm shadow-darker-grey/10"
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <CheckCircle2 className="size-14 text-green-500" />

        <h1 className="text-center text-secondary font-dm text-2xl font-bold">
          Email Verification Link Sent
        </h1>
      </div>
      <p className="text-secondary text-center text-base ">
        {" "}
        We&apos;ve sent a verification link to your inbox. Please check your
        email and click the link to complete your sign-up.
      </p>
      <div className="text-center text-xs text-light-grey">
        Didn’t receive the email? Be sure to check your spam or junk folder.
        <br />
        <div className="justify-center items-center gap-4 flex">
          <Button
            type="button"
            variant={"link"}
            onClick={() => setShowVerifyEmail(false)}
            className="text-secondary underline"
          >
            Resend
          </Button>{" "}
          {pathname === "/signup" && (
            <Button
              type="button"
              variant={"link"}
              asChild
              className="text-secondary underline"
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
export default EmailVerificationSent;
