

# 01.Clerk - 登录

## 1.1.基础使用

- 直接使用clerk包里的useAuth获取是否为登录状态

```html
import { useAuth } from "@clerk/nextjs";

const { isSignedIn } = useAuth();


<div>
    <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
      <Button variant="premium" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
        Start Generating For Free
      </Button>
    </Link>
</div>
```

- sign-up/in组件直接封装clerk包里SignUp/in组件

```react
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <SignUp />;
};

// -----------------------

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <SignIn />;
}
```





# 02.Stripe - 支付

- 环境变量中配置密钥信息

```properties
STRIPE_API_KEY=***
STRIPE_WEBHOOK_SECRET=***
```

- 点击subscribe和topUp时, 调用不同的url即可

```react
// 充值
  const onTopUp = async () => {
    try {
      setLoading(true);
      console.log("top up btn pressed");
      // 充值 对应 paymentType 为 payment
      const response = await axios.get("/api/stripe?paymentType=payment");
      console.log(response, "response-onTopUp");
      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 注册会员
  const onSubscribe = async () => {
    console.log("onSubscribe upgrade btn");
    try {
      setLoading(true);
      // 注册 直接请求 stripe
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
```





