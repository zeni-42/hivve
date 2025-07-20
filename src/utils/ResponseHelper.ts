class ResponseHelper {
    static success(data: unknown = null, message = "Success", status = 200): Response {
        return new Response(
            JSON.stringify({
                status,
                success: true,
                message,
                data,
            }),
            { status }
        );
    }

    static error(message = "Somthing went wrong", status = 400, errors: unknown = null): Response {
        return new Response(
            JSON.stringify({
                status,
                success: false,
                message,
                errors,
            }),
            { status }
        );
    }
}

export default ResponseHelper;