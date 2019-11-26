<?php
namespace app\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use Dingo\Api\Http\Request;
use Dingo\Api\Routing\Helpers;
//use Symfony\Component\HttpKernel\Exception\HttpException;
//use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
//use Tymon\JWTAuth\Exceptions\JWTException;
//use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class TodoController extends Controller
{

    use Helpers;

//    public function __construct()
//    {
//        $this->middleware('guest');
//    }
    public function add(Request $request)
    {
        // grab credentials from the request
        $credentials = $request->only('title');


        // all good so return the token
        return $this->response->array(compact('token'));
    }

    public function get(Request $request)
    {
        return $this->response->array("a","dfdf");
    }

//    public function refreshToken(Request $request)
//    {
//        $token  =   $request->get('token');
//        if(!$token)
//        {
//            return $this->response->errorBadRequest('Token not provided');
//        }
//        try {
//            $token  =   \JWTAuth::refresh($token);
//        }
//        catch(TokenInvalidException $e) {
//            return $this->response->errorForbidden('Invalid token provided');
//        }
//        return $this->response->array(compact('token'));
//    }

}
