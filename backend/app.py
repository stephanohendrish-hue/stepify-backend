from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# DATABASE CONNECTION DISABLED TEMPORARILY

db = None
cursor = None

# HOME

@app.route("/")
def home():

    return jsonify({
        "message": "STEPify Backend Running 🚀"
    })


# ==========================
# OWNER REGISTRATION
# ==========================

@app.route("/register_owner", methods=["POST"])
def register_owner():

    data = request.json

    owner_name = data["owner_name"]
    wifi_name = data["wifi_name"]
    wifi_password = data["wifi_password"]
    router_type = data["router_type"]

    sql = """
    INSERT INTO owners
    (
        owner_name,
        wifi_name,
        password,
        router_type
    )
    VALUES (%s,%s,%s,%s)
    """

    values = (
        owner_name,
        wifi_name,
        wifi_password,
        router_type
    )

    cursor.execute(sql, values)
    db.commit()

    return jsonify({
        "message": "WiFi Registered Successfully ✅"
    })


@app.route("/owners")
def get_owners():

    cursor.execute(
        "SELECT * FROM owners ORDER BY id DESC"
    )

    owners = cursor.fetchall()

    return jsonify(owners)


# ==========================
# REQUEST ACCESS
# ==========================

@app.route("/request_access", methods=["POST"])
def request_access():

    data = request.json

    user_name = data["user_name"]
    device_name = data["device_name"]

    sql = """
    INSERT INTO requests
    (
        user_name,
        device_name,
        status
    )
    VALUES (%s,%s,%s)
    """

    values = (
        user_name,
        device_name,
        "Pending"
    )

    cursor.execute(sql, values)
    db.commit()

    return jsonify({
        "message": "Request Sent 📩"
    })


@app.route("/requests")
def get_requests():

    cursor.execute(
        "SELECT * FROM requests ORDER BY id DESC"
    )

    requests = cursor.fetchall()

    return jsonify(requests)


# ==========================
# APPROVE REQUEST
# ==========================

@app.route("/approve/<int:id>")
def approve(id):

    cursor.execute(
        """
        UPDATE requests
        SET status='Approved'
        WHERE id=%s
        """,
        (id,)
    )

    db.commit()

    return jsonify({
        "message": "Approved ✅",
        "next_step": "Payment Required"
    })


# ==========================
# PAYMENT CONFIRMATION
# ==========================

@app.route("/confirm_payment/<int:id>")
def confirm_payment(id):

    cursor.execute(
        """
        UPDATE requests
        SET status='Paid'
        WHERE id=%s
        """,
        (id,)
    )

    db.commit()

    return jsonify({
        "message": "Payment Confirmed ✅"
    })


# ==========================
# CONNECT USER
# ==========================

@app.route("/connect_user/<int:id>")
def connect_user(id):

    cursor.execute(
        """
        SELECT *
        FROM requests
        WHERE id=%s
        """,
        (id,)
    )

    user = cursor.fetchone()

    if not user:

        return jsonify({
            "message": "User Not Found"
        })

    cursor.execute(
        """
        INSERT INTO connected_users
        (
            user_name,
            device_name,
            voucher_name,
            status
        )
        VALUES (%s,%s,%s,%s)
        """,
        (
            user["user_name"],
            user["device_name"],
            "Class 1",
            "Connected"
        )
    )

    db.commit()

    return jsonify({
        "message": "User Connected 🌐"
    })


@app.route("/connected_users")
def connected_users():

    cursor.execute(
        """
        SELECT *
        FROM connected_users
        ORDER BY id DESC
        """
    )

    users = cursor.fetchall()

    return jsonify(users)


# ==========================
# VOUCHERS
# ==========================

@app.route("/create_voucher", methods=["POST"])
def create_voucher():

    data = request.json

    category = data["category"]
    voucher_name = data["voucher_name"]
    price = data["price"]
    time_limit = data["time_limit"]
    data_limit = data["data_limit"]

    sql = """
    INSERT INTO vouchers
    (
        category,
        voucher_name,
        price,
        time_limit,
        data_limit
    )
    VALUES (%s,%s,%s,%s,%s)
    """

    values = (
        category,
        voucher_name,
        price,
        time_limit,
        data_limit
    )

    cursor.execute(sql, values)
    db.commit()

    return jsonify({
        "message": "Voucher Saved ✅"
    })


@app.route("/vouchers")
def get_vouchers():

    cursor.execute(
        """
        SELECT *
        FROM vouchers
        ORDER BY id DESC
        """
    )

    vouchers = cursor.fetchall()

    return jsonify(vouchers)


# ==========================
# PAYMENTS
# ==========================

@app.route("/save_payment", methods=["POST"])
def save_payment():

    data = request.json

    network_name = data["network_name"]
    phone_number = data["phone_number"]
    receiver_name = data["receiver_name"]

    sql = """
    INSERT INTO payments
    (
        network_name,
        payment_number,
        account_name
    )
    VALUES (%s,%s,%s)
    """

    values = (
        network_name,
        phone_number,
        receiver_name
    )

    cursor.execute(sql, values)
    db.commit()

    return jsonify({
        "message": "Payment Method Saved ✅"
    })


@app.route("/payments")
def get_payments():

    cursor.execute(
        """
        SELECT *
        FROM payments
        ORDER BY id DESC
        """
    )

    payments = cursor.fetchall()

    return jsonify(payments)


# ==========================
# FAMILY USERS
# ==========================

@app.route("/family_users")
def family_users():

    cursor.execute(
        """
        SELECT *
        FROM family_users
        ORDER BY id DESC
        """
    )

    users = cursor.fetchall()

    return jsonify(users)


@app.route("/add_family_user", methods=["POST"])
def add_family_user():

    data = request.json

    user_name = data["user_name"]
    device_name = data["device_name"]
    access_type = data["access_type"]
    time_limit = data["time_limit"]
    data_limit = data["data_limit"]

    sql = """
    INSERT INTO family_users
    (
        user_name,
        device_name,
        access_type,
        time_limit,
        data_limit,
        status
    )
    VALUES (%s,%s,%s,%s,%s,%s)
    """

    values = (
        user_name,
        device_name,
        access_type,
        time_limit,
        data_limit,
        "Active"
    )

    cursor.execute(sql, values)
    db.commit()

    return jsonify({
        "message": "Family User Added ✅"
    })


# ==========================
# ADS
# ==========================

@app.route("/ads")
def get_ads():

    cursor.execute(
        """
        SELECT *
        FROM ads
        ORDER BY id DESC
        """
    )

    ads = cursor.fetchall()

    return jsonify(ads)


@app.route("/create_ad", methods=["POST"])
def create_ad():

    data = request.json

    title = data["title"]
    description = data["description"]
    duration = data["duration"]

    sql = """
    INSERT INTO ads
    (
        title,
        description,
        duration,
        status
    )
    VALUES (%s,%s,%s,%s)
    """

    values = (
        title,
        description,
        duration,
        "Active"
    )

    cursor.execute(sql, values)
    db.commit()

    return jsonify({
        "message": "Ad Created ✅"
    })


# ==========================
# NOTIFICATIONS
# ==========================

@app.route("/notifications")
def notifications():

    notifications = [

        {
            "id": 1,
            "message": "📩 New Request Received"
        },

        {
            "id": 2,
            "message": "💳 Payment Confirmed"
        },

        {
            "id": 3,
            "message": "🌐 User Connected"
        },

        {
            "id": 4,
            "message": "🎫 Voucher Activated"
        }

    ]

    return jsonify(notifications)


# ==========================
# RUN SERVER
# ==========================

if __name__ == "__main__":

    app.run(
        debug=True,
        host="0.0.0.0",
        port=5000
    )