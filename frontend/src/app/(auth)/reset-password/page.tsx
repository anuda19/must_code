import ResetPasswordForm from "@/app/components/ResetPasswordForm"

const ResetPasswordPage = async({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) => {

    const { token } = await searchParams;
  return (
    <div>
        <ResetPasswordForm token={token ?? ""}/>
    </div>
  )
}

export default ResetPasswordPage