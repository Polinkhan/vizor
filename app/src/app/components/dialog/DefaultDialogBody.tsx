import { FormControl, FormLabel, Stack, TextField, Typography } from "@mui/material";

export const DefaultTableBody = {
  DeleteGroup: (text = "", input: any, setInput: any) => (
    <Stack width={1} gap={1}>
      <Typography variant="body2">Are you sure you want to delete this group ?</Typography>
      <FormControl required>
        <FormLabel sx={{ fontSize: 12 }}>
          Please type (
          <Typography component={"span"} color={"error"} sx={{ fontSize: 12, fontWeight: "bold" }}>
            {` ${text} `}
          </Typography>
          ) to continue
        </FormLabel>
        <TextField
          autoFocus
          value={input}
          variant="standard"
          onChange={(e) => setInput(e.target.value)}
        />
      </FormControl>
    </Stack>
  ),
  Dynamic: (action: string, text = "") => (
    <Stack gap={1}>
      <Typography variant="body2">Are you sure you want to {action.toLowerCase()} ?</Typography>
      <Typography variant="caption" fontWeight={"bold"} color={"grey"}>
        ( {text} )
      </Typography>
    </Stack>
  ),
};
