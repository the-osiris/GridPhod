import User from "../model/userSchema.js";

export const userLogIn = async (request, response) => {
  try {
    let user = await User.findOne({
      username: request.body.username,
      password: request.body.password,
    });
    if (user) {
      return response
        .status(200)
        .json(`${request.body.username} login successfull`);
    } else {
      return response.status(401).json("Invalid Login");
    }
  } catch (error) {
    response.json("Error: ", error.message);
  }
};

export const userSignUp = async (request, response) => {
  try {
    const exist = await User.findOne({ username: request.body.username });
    if (exist) {
      return response.status(401).json({ message: "User already exist" });
    }
    const user = request.body;
    const newUser = new User(user);
    await newUser.save();
    response.status(200).json({ mesage: user });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

//username, id, time
export const postVisitItems = async (request, response) => {
  // console.log("backend mein visit enter ho rha hai");
  try {
    if (!request.body.username)
      return response
        .status(400)
        .json({ message: "Username missing in request" });

    console.log(request.body);

    const user = await User.findOne({ username: request.body.username });
    if (user) {
      const id = request.body.id;
      const time = request.body.time;

      let flag = 0;
      user.visitedProducts.forEach((ele) => {
        if (ele.id == id) {
          flag = 1;
          ele.counter++;
          ele.time += time;
        }
      });

      if (!flag) {
        user.visitedProducts.push({ id, time, counter: 1 });
      }

      await user.save();
      return response.status(200).json({ message: "Data updated" });
    } else {
      response.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

//username, id
export const postCartItems = async (request, response) => {
  try {
    if (!request.body.username)
      return response
        .status(400)
        .json({ message: "Username missing in request" });

    const user = await User.findOne({ username: request.body.username });
    if (user) {
      const id = request.body.id;

      let flag = 0;
      user.CartProducts.forEach((ele) => {
        if (ele.id == id) {
          flag = 1;
        }
      });

      if (!flag) {
        user.CartProducts.push({ id });
      }

      await user.save();
      return response.status(200).json({ message: "Data updated" });
    } else {
      response.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

//username, id
export const postBuyItems = async (request, response) => {
  try {
    if (!request.body.username)
      return response
        .status(400)
        .json({ message: "Username missing in request" });

    const user = await User.findOne({ username: request.body.username });
    if (user) {
      const id = request.body.id;

      let flag = 0;
      user.BuyProducts.forEach((ele) => {
        if (ele.id == id) {
          flag = 1;
          ele.time += time;
        }
      });

      if (!flag) {
        user.BuyProducts.push({ id, counter: 1 });
      }

      await user.save();
      return response.status(200).json({ message: "Data updated" });
    } else {
      response.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
