<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Redaktora giriş</title>
    <link rel="stylesheet" href="/public/media/css/login.css">
</head>
<body>

    <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h2>Login to Editor</h2>
                <form action="" method="post">
                    <div class="form-label-group">
                        <input type="text" name="username" id="inputEmail" class="form-control" placeholder="Username" required autofocus>
                        <label for="inputEmail">Username</label>
                    </div>
                    <div class="form-label-group">
                        <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password" required>
                        <label for="inputPassword">Password</label>
                    </div>
                    <?php if(isset($errors) && is_array($errors)): ?>
                        <ul>
                            <?php foreach ($errors as $error): ?>
                                <li style="color: red;"> <?php echo $error; ?> </li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                    <input type="submit" name="submit" class="btn btn-lg btn-primary btn-block text-uppercase" value="Enter" />
                </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
