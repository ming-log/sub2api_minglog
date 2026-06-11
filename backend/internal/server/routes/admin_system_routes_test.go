package routes

import (
	"os"
	"strings"
	"testing"
)

func TestAdminSystemUpdateRoutesAreNotRegistered(t *testing.T) {
	data, err := os.ReadFile("admin.go")
	if err != nil {
		t.Fatalf("read admin routes: %v", err)
	}
	source := string(data)
	removedRoutes := []string{
		`"/version"`,
		`"/check-updates"`,
		`"/update"`,
		`"/rollback"`,
		`"/restart"`,
	}
	for _, route := range removedRoutes {
		if strings.Contains(source, route) {
			t.Fatalf("admin system route %s should not be registered", route)
		}
	}
}
