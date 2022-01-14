const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const methodOverride = require("method-override");
const app = express();
const port = 4000;
const cors = require("cors");
app.use(cors());
// const router = express.Router();

// router.get("localhost:3001/news", (req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.setHeader("Access-Control-Max-Age", "1800");
//     res.setHeader("Access-Control-Allow-Headers", "content-type");
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "PUT, POST, GET, DELETE, PATCH, OPTIONS"
//     );
// });

const sortMiddleware = require("./app/middleWares/sortMiddleware");

app.use(express.urlencoded());

app.use(methodOverride("_method"));

//lấy thông tin của thằng routes/index.js exports ra gán vào biến route
const route = require("./routes");
const db = require("./config/db");
//connect to DB
db.connect();

//express.static để xử lí file tĩnh như ảnh, audio,video trong máy..., __dirname là đường dẫn tới chính file đang dùng lệnh __dirname
app.use(express.static(path.join(__dirname, "public")));
//http logger
app.use(morgan("combined"));

//customize middleware
app.use(sortMiddleware);

//template engine
app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        // hbs : handlebars
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : "default";

                const icons = {
                    default: "oi oi-elevator",
                    desc: "oi oi-sort-descending",
                    asc: "oi oi-sort-ascending",
                };

                const types = {
                    default: "asc",
                    desc: "asc",
                    asc: "desc",
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}">
                            <span class="${icon}"></span>
                        </a>`;
            },
        },
    })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));
// console.log('path:' ,path.join(__dirname, 'resources/views'));

//routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
