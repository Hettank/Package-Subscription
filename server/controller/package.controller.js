import packageServices from "../services/package.service.js"

const packageController = {
    getPackages: async (req, res) => {
        try {
            const packages = await packageServices.getPackages()
            res.status(200).json(packages)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },

    createPackage: async (req, res) => {
        try {
            const { title, description, price, fromDate, toDate } = req.body

            const packages = await packageServices.createPackage(title, description, price, fromDate, toDate)

            res.status(201).json(packages)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },

    updatePackage: async (req, res) => {
        try {
            const { title, description, price, fromDate, toDate } = req.body

            const { packageId } = req.params

            const updatedPackage = await packageServices.updatePackage(title, description, price, fromDate, toDate, packageId)

            res.status(200).json(updatedPackage)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },

    deletePackage: async (req, res) => {
        try {
            const { packageId } = req.params

            const deletePackage = await packageServices.deletePackage(packageId)

            res.status(200).json({ message: "Package Deleted Successfully" })
        } catch (error) {
            res.status(200).json({ error: error.message })
        }
    },

    buyPackage: async (req, res) => {
        try {
            const { userId, packageId } = req.body

            const result = await packageServices.buyPackage(userId, packageId)

            res.status(200).json({ message: "package purchased successfully", packages: result.packages, users: result.user })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to buy package", error: error.message });
        }
    },

    fetchPackageByUser: async (req, res) => {
        try {
            const { userId } = req.params

            const result = await packageServices.fetchPackageByUser(userId)

            res.status(200).json({ result })
        } catch (error) {
            res.status(400).json({ error: error.message })

        }
    }
}

export default packageController